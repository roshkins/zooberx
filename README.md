 # Code structure
  Broadly speaking, there are two folders, frontend and backend. Folder "frontend" has all the frontend code. Folder "backend" has the backend code. Each end is it's own node package to make package management easier and to prevent "create-react-app" from potentially modifying files in the backend, and vice versa. There is a script, "init.ps1" that launches both packages on different ports.

  To make it easier for the reviewers to find the two exposed methods, I will have them each in their own file and import them as necessary. This will also make a convenient place to put unit tests.

 # Architecture
  Because speed of coding, not scalability or computational efficiency is needed, I can most rapidly prototype my backend in Node.js using loopback. This will allow me to create CRUD actions for the wildebeests most rapidly and implement the retrieval of the wildebeests.

  I will use "create-react-app" for the frontend, as it packages many useful technologies together. I will use React as the frontend language with its built-in server. I will use Jest for testing. I will not be using Redux as the app does not have to scale, and slows development time. In addition, the frontend state is very simple.

 # Design
 ## Backend
  The backend is a strongloop app which will have CRUD scaffold for the models. I will create a custom route for "getYourWildebeest". "getWildebeets" is a special case of the "GET" REST request, so I will not have to implement it.

 ### Models
  Because a wildebeest can carry an unlimited number of Oxpeckers, and the rest of the specification does not deal with Oxpeckers, I will not be modeling Oxpeckers.

  There are no relations between wildebeests, so the model is simply an object with fields not referencing each other.

  Wildebeests have a location, a name, and a direction.

  The location will be two fields of type "string", "latitude" and "longitude". I am not using floating point numbers because floating points can lose precision, especially with the specificity we are using.  I will convert them as needed.

  Their name will be a field of type "string" called "name".

  Their direction will be a field of type "string" called "direction" that will hold the name of a destination, either "Kenya" or "Tanzania". This makes it easy to add more destinations later versus a boolean data type.

 ### Methods
 #### getWildebeests()
 This will be scaffolded for me.

 #### getYourWildebeest()
 This looks like a variant of the k-nearest-neighbor problem, for k=1. Other people can write this better than I every could, so I will use the "k.n.n" package, found here "https://www.npmjs.com/package/k.n.n". It will also allow me to scale to more destinations. I realize that I could probably convert all the wildebeest to a one-dimensional distance from me, the Oxpecker, because they are all on a line, sort them by distance, and take the first one, but that would take more time to write. Plus, it will scale better with more wildebeest.

 ### Testing
 I will write Jest unit tests.

 #### getWildebeests()
 This is pretty straightforward. I will test if any wildebeest exist or is an empty array. If a wildebeest exists I will check if it has the right fields of the correct type and aren't null.

 #### getYourWildebeest()
 I will test that a given GPS coordinate and destination will return a wildebeest. I will test that the wildebeest it returns is the closest from a sample set of ten. I would test more than 10 wildebeest to make sure it can analyze large amounts of data but that isn't needed. I will make sure it gives an error message if there are no Wildebeest going in your direction.

 #### Generating data
  I will create a script in loopback that when run will create the 10 wildebeest and randomize them every 3 seconds in a non-terminating loop.

 ## frontend
 I will use "create-react-app" with Jest. This will be a single page application, with the ui.

 I will use "https://github.com/uber/react-map-gl" to visualize the location of the Wildebeest. I'll encapsulate it in a React component and only expose a way to pass the wildebeest models.

 I'll make a simple form on the left side that submits a request using the fetch api.

 I'll set up jest snapshotting. I can check that the form component submits all the data as a proper JSON object.
