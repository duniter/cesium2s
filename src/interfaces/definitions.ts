export default {
  types: {
    "Balance": "u64",
    "Planet": {
      "_enum": [
        "Earth"
      ]
    },
    "IdtyDid": {
      "hash": "[u8; 32]",
      "planet": "Planet",
      "latitude": "u32",
      "longitude": "u32"
    },
    "IdtyRight": {
      "_enum": [
        "CreateIdty",
        "LightCert",
        "StrongCert",
        "Ud"
      ]
    },
    "IdtyStatus": {
      "_enum": [
        "Created",
        "ConfirmedByOwner",
        "Validated"
      ]
    },
    "IdtyValue": {
      "owner_key": "AccountId",
      "removable_on": "Option<u32>",
      "rights": "Vec<(IdtyRight, Option<AccountId>)>",
      "status": "IdtyStatus"
    }
  }
}
