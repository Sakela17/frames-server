# Frames

## Live URL
https://frames-api.herokuapp.com/

## Client URL
https://frames-app.surge.sh/
## Client Repo
https://github.com/valsakel/frames-client
***

## Summary
A managing and scheduling API/client for small retailers and restaurants. When scheduling for multiple shifts, multiple employees over multiple divergent time zones, Frames steps in to take out the leg work. Users can easily add, assign, edit and delete shifts, maintain a list of employees and contact information and keep their schedules straight in daily, weekly or monthly views.

***

## Tech Stack
* Node.js
* Express
* Mongo
* Mongoose.js
* Passport (JSON Web Token & Local Authentication)

***

 ## Authors
* [Cameron Prier](https://github.com/Csprier)
* [Marina Dargitz](https://github.com/mdargitz)
* [Marina Valiquette](https://github.com/Sakela17)
* [Gianluca Paterson](https://github.com/patersog)

***

## API Documentation

### Admin endpoints

#### `/admin`

Endpoint representing all admins using Frames (manager for a business/company).

***

```
POST /admins
```

Add an admin to Frames

*URL Parameters*:

None

*Data parameters*:

* __username__ (String,  required, trimmed)
* __password__ (String, required, trimmed, at least 8 characters)
* __email__ (String, valid, required, trimmed, unique)
* __companyName__ (String, required, trimmed)
* __phoneNumber__ (String, valid, required, trimmed)

*Query string parameters*:

None

*Returns*:

a JSON object of the new admin

*Example*:

```
> POST /admins
> {
>   "username" : "testuser",
>   "password" : "testpassword",
>   "email" : "me@email.com",
>   "companyName" : "My Co",
>   "phoneNumber" : "1231231234"
> }

< Status: 201 Created
< Location: /admin/:adminId
> {
>   "id" : "4322jkafjaiwa3782",
>   "username" : "testuser",
>   "email" : "me@email.com",
>   "companyName" : "My Co",
>   "phoneNumber" : "1231231234",
>   "createdAt": "2018-07-18T15:19:17.918Z",
>   "updatedAt": "2018-07-24T21:30:32.493Z",
> }
```

***
***

__`/admin/:adminId`__

Endpoint representing one admin

***

```
GET /admins/:adminId
```

Get a single user of Frames.

*URL parameters*:

* `adminId` - The id of the admin.

*Data parameters*:

* none

*Query string parameters*:

None

*Returns*:

A JSON object of the user.

*Example*:

```
> GET /admins/:adminId

< Status: 200 OK
< {
<   "id": adminId,
<   "username" : "testuser",
<   "email" : "me@email.com",
<   "companyName" : "My Co",
<   "phoneNumber" : "1231231234",
<   "createdAt": "2018-07-18T15:19:17.918Z",
<   "updatedAt": "2018-07-24T21:30:32.493Z",
< }
```

***

```
PUT /admin/:adminId
```

Add or edit a Frames admin.

*URL parameters*:

* `adminId` - The id of the admin to add or edit.

*Data parameters*:

* __username__ (String,  optional, trimmed)
* __password__ (String, optional, trimmed, at least 8 characters)
* __email__ (String, valid, optional, trimmed, unique)
* __companyName__ (String, optional, trimmed)
* __phoneNumber__ (String, valid, optional, trimmed)

*Query string parameters*:

None

*Returns*:

A JSON object of the newly updated admin, including the new changes.

*Example*:

```
> PUT /admins/:adminId
> {
>   "companyName" : "My Better Co"
> }

< Status: 200 OK
< {
<   "id": adminId,
<   "username" : "testuser",
<   "email" : "me@email.com",
<   "companyName" : "My Better Co",
<   "phoneNumber" : "1231231234",
<   "createdAt": "2018-07-18T15:19:17.918Z",
<   "updatedAt": "2018-07-24T21:30:32.493Z",
< }
```

***
***

### Employee Endpoint (Protected)

#### `/employee`

Endpoint representing all employees using Frames

***

```
GET /employee/
```

get all employees for a single business.

*URL parameters*:

* none

*Data parameters*:

None

*Query string parameters*:

None

*Returns*:

A JSON array of the all employees associated with an authorized admin user.

*Example*:

```
> GET /employee/

< Status: 200 OK
< [{
<   "id": "3278242jkasklu32",
<   "firstName" : "testuser",
<   "lastName" : "testuserson",
<   "email" : "me@email.com",
<   "phoneNumber" : "1231231234",
<   "createdAt": "2018-07-18T15:19:17.918Z",
<   "updatedAt": "2018-07-24T21:30:32.493Z",
< },
< {...},
< ]
```

***
```
GET /employee/:employeeId
```

get a single employee associated with the authorized admin user.

*URL parameters*:

* employeId - id of a the given employee

*Data parameters*:

None

*Query string parameters*:

None

*Returns*:

A JSON object of the employee associated with an authorized admin user.

*Example*:

```
> GET /employee/:employeeId

< Status: 200 OK
< {
<   "id": "3278242jkasklu32",
<   "firstName" : "testuser",
<   "lastName" : "testuserson",
<   "email" : "me@email.com",
<   "phoneNumber" : "1231231234",
<   "createdAt": "2018-07-18T15:19:17.918Z",
<   "updatedAt": "2018-07-24T21:30:32.493Z",
< }
```

***

```
PUT /employee/:employeeId
```

update a single employee associated with an authorized admin.

*URL parameters*:

* `employeeId` - id of the employee

*Data parameters*:

* __firstname__ (String, optional)
* __lastname__ (String, optional)
* __password__ (String, at least 8 characters, optional)
* __img__ (String, optional)
* __email__ (String, optional)
* __phoneNumber__ (String, optional)

*Query string parameters*:

None

*Returns*:

A JSON object of the updated employee, representing the new changes

*Example*:

```
> PUT /employee/:employeeId

< Status: 200 OK
< {
<    "adminId": "5b58ea356d69ad346897b356",
<    "firstname": "Red",
<    "lastname": "Ridinghood",
<    "img": "https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg",
<   "email": "test@test.com",
<   "phoneNumber": "1231231234",
<   "id": "5b5a06d6486c8738a4e190c7"
< }
```

***


```
POST /employees/:employeeId
```

create a single employee under an admin.

*URL parameters*:

* `employeeId` - id of the employee

*Data parameters*:

* __firstname__ (String)
* __lastname__ (String)
* __password__ (String, required, at least 8 characters)
* __img__ (String)
* __email__ (String)
* __phoneNumber__ (String)

*Query string parameters*:

None

*Returns*:

A JSON object of the new employee

*Example*:

```
> PUT /employee/:employeeId

< Status: 201 CREATED
< {
<    "adminId": "5b58ea356d69ad346897b356",
<    "firstname": "Red",
<    "lastname": "Ridinghood",
<    "img": "https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg",
<   "email": "test@test.com",
<   "phoneNumber": "1231231234",
<   "id": "5b5a06d6486c8738a4e190c7"
< }
```
***

```
DELETE /employees/:employeeId
```

delete a single employee under an admin.

*URL parameters*:

* `employeeId` - id of the employee

*Data parameters*:

* none

*Query string parameters*:

* none

*Returns*:

Only a status, no content

*Example*:

```
> DELETE /employee/:employeeId

< Status: 204 DELETED

```

***
***

### Frames endpoint (Protected)

#### `/frames`

Endpoint representing the concept of the 'frame' or chunk of time used for scheduling

***


```
GET /frames/
```

get the 'frames' of an admin (The schedule for a day).

*URL parameters*:

* none

*Query string parameters*:

* startDate=[ISO-Date] (required)

* endDate=[ISO-Date] (required)

*Returns*:

an array of all frames associated with this admin, in the specified time slot

*Example*:

```
> GET /frames/

< Status: 200 SUCCESS
< [{
<   "adminId": "5b58ea356d69ad346897b356",
<   "employeeId": null,
<   "startFrame": "2018-07-25T23:00:00.000Z",
<   "endFrame": "2018-07-26T02:00:00.000Z",
<   "createdAt": "2018-07-25T21:33:49.956Z",
<   "updatedAt": "2018-07-25T21:33:49.956Z",
<   "id": "5b58ecbd6d69ad346897b359"
< },
< {..}>]

```

***


```
GET /frames/:employeeId
```

get the 'frame' of a single employee (schedule for one employee).

*URL parameters*:

* `employeeId` - id of the employee

*Query string parameters*:

* none

*Returns*:

an array of all frames associated with this employee

*Example*:

```
> GET /frames/:employeeId

< Status: 200 SUCCESS
< [{
<   "adminId": "5b58ea356d69ad346897b356",
<   "employeeId": null,
<   "startFrame": "2018-07-25T23:00:00.000Z",
<   "endFrame": "2018-07-26T02:00:00.000Z",
<   "createdAt": "2018-07-25T21:33:49.956Z",
<   "updatedAt": "2018-07-25T21:33:49.956Z",
<   "id": "5b58ecbd6d69ad346897b359"
< },
< {..}>]

```

***

```
GET /frames/frame/:frameId
```

get a single 'frame' of a single employee.

*URL parameters*:

* `frameId` - id of the frame
*Query string parameters*:

* none

*Returns*:

a JSON object of all frames associated with this employee

*Example*:

```
> GET /frames/:frameId

< Status: 200 SUCCESS
< {
<   "adminId": "5b58ea356d69ad346897b356",
<   "employeeId": null,
<   "startFrame": "2018-07-25T23:00:00.000Z",
<   "endFrame": "2018-07-26T02:00:00.000Z",
<   "createdAt": "2018-07-25T21:33:49.956Z",
<   "updatedAt": "2018-07-25T21:33:49.956Z",
<   "id": "5b58ecbd6d69ad346897b359"
< }

```
***


```
POST /frames/frame/
```

create a single 'frame' of a single employee.

*URL parameters*:

* none

*Query string parameters*:

* none

*Data parameters*

* __employeeId__ (String, optional)
* __startFrame__ (String, required)
* __endFrame__ (String, required)

*Returns*:

a JSON object of the newly created frame

*Example*:

```
> POST /frames/frame/
> {
>   "employeeId": null,
>   "startFrame": "2018-07-25T23:00:00.000Z",
>   "endFrame": "2018-07-26T02:00:00.000Z",
> }

< Status: 201 CREATED
< {
<   "adminId": "5b58ea356d69ad346897b356",
<   "employeeId": null,
<   "startFrame": "2018-07-25T23:00:00.000Z",
<   "endFrame": "2018-07-26T02:00:00.000Z",
<   "createdAt": "2018-07-25T21:33:49.956Z",
<   "updatedAt": "2018-07-25T21:33:49.956Z",
<   "id": "5b58ecbd6d69ad346897b359"
< }

```
***


```
PUT /frames/frame/:frameId
```

edit a single 'frame' of a single employee.

*URL parameters*:

* none

*Query string parameters*:

* none

*Data parameters*

* __employeeId__ (String, optional)
* __startFrame__ (String, optional)
* __endFrame__ (String, optional)

*Returns*:

a JSON object of the newly updated frame

*Example*:

```
> PUT /frames/frame/:frameID
> {
>   "employeeId": "789274389274832978sa"
> }

< Status: 200 SUCCESS
< {
<   "adminId": "5b58ea356d69ad346897b356",
<   "employeeId": employeeId,
<   "startFrame": "2018-07-25T23:00:00.000Z",
<   "endFrame": "2018-07-26T02:00:00.000Z",
<   "createdAt": "2018-07-25T21:33:49.956Z",
<   "updatedAt": "2018-07-25T21:33:49.956Z",
<   "id": "5b58ecbd6d69ad346897b359"
< }

```
***


```
DELETE /frames/frame/:frameId
```

delete a single 'frame' of a single employee.

*URL parameters*:

* none

*Query string parameters*:

* none

*Data parameters*

* none

*Returns*:

No content, only a status.

*Example*:

```
> DELETE /frames/frame/:frameID

< Status: 204 DELETED

```
***
