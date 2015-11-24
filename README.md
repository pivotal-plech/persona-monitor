# Pivotal UI React Prototyping

### First things first.
0. `npm i`
0. Change the manifest application name from `pui-react-prototyping` to [the-name-of-your-app].

### To run locally
0. `gulp serve`

* * *

The framework is a fork of a [yeoman generator for react](https://www.npmjs.com/package/generator-react-reflux). To generate a new component:
0. `yo react-reflux:component product`

### To build and push to pws
Make sure you changed the name of your application in the manifest.yml. There is a Makefile in the root directory, so you can just run:
0. `make build`

this will run the following commands

```
gulp build
cd dist
cf push
cd ../
```

### Firebase
We're using firebase as a stubbed out hosted database. Currently, you can just BYO-JSON and import it into your own firebase. [This tutorial](https://www.firebase.com/blog/2015-07-15-reactfire-0-5-0.html) is a good resource for getting up and running with firebase. Firebase has great [documentation](https://www.firebase.com/docs/web/libraries/react/) for getting started and working with it's react mixin.
