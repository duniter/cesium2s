# Cesium²

Cesium² is a simple wallet for libre Currency like G1, compatible with the [Duniter protocol](https://git.duniter.org/nodes/typescript/duniter/blob/dev/doc/Protocol.md).

## Installation

### On Android

 - Download then install the latest APK file

or 

- Install the app from the [Play Store](https://play.google.com/store/apps/details?id=fr.duniter.cesium2) 


### As a web site

#### First installation

Cesium can be easily installed on most web server :

 - Download the latest release (file cesium2-vx.y.z-web.zip);
 - Unpack into an empty directory;
 - Configure the web server engine (e.g. Apache, Nginx):
   - Add a new virtual host, that use the directory as `web root`.
   - Make sure the file `index.html` exists on this directory.

#### Update to last version

On Linux, an update script can be used to update your Cesium² web site:
 - Using cURL:
    ```bash
    cd <CESIUM2_WEB_ROOT>
    curl -o- https://git.duniter.org/clients/cesium-grp/cesium2/raw/master/install.sh | bash
    ```

 - or using Wget:

    ```
    cd <CESIUM2_WEB_ROOT>
    wget -qO- https://git.duniter.org/clients/cesium-grp/cesium2/raw/master/install.sh | bash
    ```

## Contribute

See the [developer guide](./doc/Building_from_sources.md)

## License

Free software, distributed under a [AGPL v3 license](./LICENSE).
