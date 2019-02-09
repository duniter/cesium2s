# Cesium 2


## Compile from source

1. Install Node.js v8+
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm use 8
```

2. Install global dependencies:
```
npm install -g ionic@^4.0.0-beta.11 cordova@^8.0.0 @angular/cli@^6.1.2
```
3. Clone the repo: `git clone ...`
4. Install project dependencies
```
cd cesium2
npm install
```

5. Start a Duniter node with GraphQL API (GVA). See https://git.duniter.org/nodes/typescript/modules/gva-api/

A GraphQL editor should be accessible at [localhost:8080](http://localhost:8080/graphql)

6. Start app
```
cd cesium2
npm start
```
ou
```
ng serve --port [port]
```

The application should be accessible at [localhost:4200](http://localhost:4200)

7. Check environment configuration

Edit the file `src/environment/environment.ts`

8. Build a release
```
npm run build --prod --release
```


## Developer guide :

- Ionic 4 colors: https://www.joshmorony.com/a-primer-on-css-4-variables-for-ionic-4/
- Migration to Ionic 4 tips: https://www.joshmorony.com/my-method-for-upgrading-from-ionic-3-to-ionic-4/

## Useful additional tools
```
sudo apt-get install chromium-browser docker.io
```
