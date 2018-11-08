# Redux - reselect
 
The state is composed of two combined reducers. One handles only the router state, the other handles all entities coming from the TFL api.
 
I heavily use `reselect` to refine the state. When the state is propagated to component with `react-redux`, it's almost always through selectors.
 
A well used used example is pulling the current station id from the router url. And then combine it with the list of cached stations.
 
# Router
 
I am not a huge fan of react router, I don't see the point of binding the router logic to react. Most of the time I prefer to have the router state in redux.
 
Instead I re-used a small library I wrote. It provide a route resolver, warped inside a reducer.
 
It also exposes a service that receive the store as argument: Every change in the url will trigger an action; and the other way: every change in the store router state will trigger a `location.replace`.
 
I actually like very much this pattern of having each isolated service listening to the store to trigger side effect, and giving feedback with actions. 
No need to tied anything to react, it's better for SSR and better for testing.
 
# TFL api
 
I started to explore the api by writing tests cases. As I use flow to type, I wanted to have a tested layer of function which talks to the TFL api.
 
I did some parsing, trimming useless properties and renaming some.
 
http requests follow the same "store side effect" pattern as the router. It determines from the state what request should be made, and notify the store with action when it's done.
 
Some request need to be refreshed from time to time. The arrival times is refreshed every 0.3 min ( for testing purpose, there is no need really ) and line statuses every minute.
 
# UX UI
 
There is three pages:
 
 - list of lines
 - list of stations for the selected line
 - list of arrival time for the selected station
 
Line colors are hard coded.
 
In the arrival time page, the "arrive in X min" countdown automatically update.
 
While request are pending, a spinner placeholder is displayed ( the '...' actually )
 
# line display
 
Each line is displayed in a way that the station can be listed horizontally.
 
The algorithm work that way: 
- build a non-directed graph from the routes
- find the longest line
- go through the line. For each fork "merge" the two line, alternating the stations for each line.
 
Note that it does not respect any geographical constraint.
 
It looks good, but it's probably not the most convenient way to display this information. The line merge is kind of confusing.
 
# testing
 
There is some test for each call to the TFL api. I use flow-runtime to generate runtime type checking function to ensure the data received are correct.
 
There is also some unit test for the graph related functions.
 
I used `tape` as test runner. I really like it because it also runs in the browser. That means I can use chrome devtool to break in my code. Which is great.
 
# future
 
The "if I had any time left" part
 
- have nice page transition. With the line dot on the home page expanding to become the header of the station list page. I really wanted to do this one, but I already exploded the time budget. 
 
  I kind of already did some thing like that ( github.com/Platane/june )
 
- make the app work offline with serviceworker and a manifest file. Not super hard, I did it before ( github.com/Platane/watwet )
 
 
####

# Notes

_TFL API_

* sometimes ( a lot actually ) the arrival time api fails with a 200 status code and the body:

```
{
  "$type":
    "Tfl.Api.Presentation.Entities.ApiError, Tfl.Api.Presentation.Entities",
  "timestampUtc": "2018-08-06T23:23:18.8110315Z",
  "name": "Internal",
  "exceptionType": "OutOfMemoryException",
  "httpStatusCode": 500,
  "httpStatus": "InternalServerError",
  "relativeUri": "/stoppoint/940GZZLUBDS/arrivals",
  "message": "An internal server error occurred."
}
```

* sometimes arrivals times are duplicated (?) or there is two / three train that arrived at the exact same time at the same platform, which I doubt.
