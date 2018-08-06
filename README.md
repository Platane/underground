# Underground

## Note

sometimes the arrival time api fails with a 200 status code and the body:

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
