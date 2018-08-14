# Underground

This project is a part of a test.

https://storage.googleapis.com/underground-citym-test/v2/index.html

There is postmoterm explaining the architectural choices.

## Note

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
