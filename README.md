# RetroSheet-TS

Thanks to : [Retrosheet by theApache64](https://github.com/theapache64/retrosheet)

## Usage ⌨️

### Fetch Google Sheet Data.

#### Get Spreadsheet ID
![get_spreadsheet_id.png](images/get_spreadsheet_id.png)

#### Get Data
```js
const response = await fetchRetrosheetData("<Spreadsheet ID>", { sheetName: "notess", query: "select * limit 2" })
```

<details>
<summary>Output</summary>

```json
[
  {
    "created_at": "26/08/2023 17:37:06",
    "title": "Hello",
    "description": "Description"
  },
  {
    "created_at": "26/08/2023 17:37:28",
    "title": "Yogesh",
    "description": "Description"
  }
]
```

</details>

### Write Data to Google Sheet.

Follow steps 1 - 4 from [here](https://github.com/theapache64/retrosheet)

#### Write data
```js
const request = {
    'Title': "test title",
    'Description': 'test Description'
}
submitForm("<FORM_ID>", request)
```
**_Note: Keys of request must be the same as Form Field name._**

