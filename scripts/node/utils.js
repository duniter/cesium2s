const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');
const shell = require('shelljs');
const readdir = util.promisify(fs.readdir);

function checkPermission(file, mask){
  const stats = fs.statSync(file);
  return !!(mask & parseInt((stats.mode & parseInt ("777", 8)).toString (8)[0]));
}
function canExecute(file) {
  return checkPermission(file, 1);
}
function canRead(file) {
  return checkPermission(file, 4);
}
function canWrite(file) {
  return checkPermission(file, 2);
}

function checkValidProjectDirectory(directory) {
  if (typeof directory !== 'string')
    throw new Error(`Agument must be a string : "${typeof directory}" given.`);
  if (! fs.existsSync(directory))
    throw new Error(`Path does not exists : "${directory}"`);
  if (! fs.lstatSync(directory).isDirectory())
    throw new Error(`Path is not a directory : "${directory}"`);
  if (! canRead(directory) && canWrite(directory) && canExecute(directory))
    throw new Error(`Bad permission on directory : "${typeof directory}"`);
}

function checkShellDependencies(shellDeps) {
  const envPaths = process.env.PATH.split(':');

  const missing = shellDeps.reduce((acc, current) => {
    const result = envPaths.some((dir) => {
      const execPath = path.join(dir, current);
      return fs.existsSync(execPath) && canExecute(execPath);
    });
    if (!result) acc.push(current);
    return acc;
  }, [])

  if (missing.length > 0) {
    throw new Error(`The following shell executable are required : "${missing.join(', ')}" but not found in current path : ${process.env.PATH}`);
  }
}

async function copyFilePermissions(sourcePath, destPath, options) {
  try {
    const stats = fs.statSync(sourcePath);

    fs.chmodSync(destPath, stats.mode);

    // If recursive, and folder
    if (options?.recursive && stats.isDirectory()) {
      const files = await readdir(sourcePath);
      for (const file of files) {
        // Recursive call
        await copyFilePermissions(path.join(sourcePath, file), path.join(destPath, file), options);
      }
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Déplace tous les
 * @returns {Promise<void>}
 * @param sourcePath
 * @param destPath
 */
async function mvFile(sourcePath, destPath) {
  try {
    fs.cpSync(sourcePath, destPath, {recursive: true});

    await copyFilePermissions(sourcePath, destPath, {recursive: true});

    fs.rmSync(sourcePath, {recursive: true});

  } catch (err) {
    throw err;
  }
}

/**
 * Copie tous les fichiers et dossiers d'un répertoire source vers un répertoire de destination.
 * @param {string} sourceDir - Le répertoire source.
 * @param {string} destDir - Le répertoire de destination.
 * @returns {Promise<void>}
 */
async function copyFiles(sourceDir, destDir) {
  try {
    const files = await readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      fs.cpSync(sourcePath, destPath, {recursive: true});
    }
  } catch (err) {
    throw err;
  }
}

function copyFromTemplateFile(src, dest, replaceItems) {
  // TODO test dest exists, and readable and src parent exists and writable and if text file
  fs.copyFileSync(src, dest);
  replaceTextInFile(dest, replaceItems);
}


/**
 * Déplace tous les fichiers et dossiers d'un répertoire source vers un répertoire de destination.
 * @param {string} sourceDir - Le répertoire source.
 * @param {string} destDir - Le répertoire de destination.
 * @returns {Promise<void>}
 */
async function moveFiles(sourceDir, destDir) {
  try {
    const files = await readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      await mvFile(sourcePath, destPath);
    }

    // Remove source directory
    fs.rmdirSync(sourceDir);
  } catch (err) {
    throw err;
  }
}

/**
 * Télécharge un fichier depuis une URL et le sauvegarde dans un chemin spécifié.
 * @param {string} url - L'URL du fichier à télécharger.
 * @param {string} dest - Le chemin où le fichier doit être sauvegardé.
 * @returns {Promise<void>}
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error while downloading '${url}': Statut ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      // Delete partially downloading file
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

/**
 * Décompresse un fichier ZIP dans un répertoire spécifié.
 * @param {string} zipFilePath - Chemin du fichier ZIP à décompresser.
 * @param {string} destDir - Répertoire de destination pour la décompression.
 * @returns {Promise<void>}
 */
async function unzipFile(zipFilePath, destDir) {

  try {
    // Creating dest
    fs.mkdirSync(destDir, { recursive: true });

    // FIXME: unzipper lib is not working well => file permissions are not preserved
    // return new Promise((resolve, reject) => {
    //   fs.createReadStream(zipFilePath)
    //     .pipe(unzipper.Extract({ path: destDir, preserveFileMode: true }))
    //     .on('close', resolve)
    //     .on('error', reject);
    // });

    if (shell.exec(`unzip -q ${zipFilePath} -d ${destDir}`).code !== 0) {
      throw new Error(`Failed to unzip file ${zipFilePath}`);
    }

  } catch (err) {
    throw new Error(`Cannot unzip file ${zipFilePath}: ${err}`);
  }
}

/**
 * Remplacer des motifs a l'interieur d'un fichier.
 * @param {string} filePath - Chemin du fichier.
 * @param {object} destDir - Object avec deux propriétées :
 *                           - searchValue : une Regexp à rechercher
 *                           - replaceValue : le texte de remplacement
 * @returns {void}
 */
function replaceTextInFile(filePath, replaceItems) {
  if (! fs.existsSync(filePath)) throw Error(`${filePath} does not exist.`)
  if (! canRead(filePath)) throw Error(`"${filePath} is not readable.`);
  if (! canWrite(filePath)) throw Error(`"${filePath} is not writable.`);

  try {
    const fileLines = fs.readFileSync(filePath, 'utf8')
      .split('\n')
      .map((line) => {
        replaceItems.forEach(item => {
          line = line.replace(item.searchValue, item.replaceValue);
        });
        return line;
    });
    fs.writeFileSync(filePath, fileLines.join('\n'), 'utf8')
  } catch(err) {
    console.error(err);
    throw new Error(`Cannot substitute text in file : ${filePath}`);
  }
}


module.exports = {
  canExecute,
  canRead,
  canWrite,
  checkShellDependencies,
  checkValidProjectDirectory,
  copyFiles,
  copyFromTemplateFile,
  downloadFile,
  moveFiles,
  mvFile,
  replaceTextInFile,
  unzipFile,
};
