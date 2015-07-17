function demoPerformQuery() {
  var container = CloudKit.getDefaultContainer();
  var publicDB = container.publicCloudDatabase;

  // Get the user's current geolocation.
  return getUsersPosition().then(function (position) {

    // position is an object containing keys 'latitude' and 'longitude'.

    // Set up a query that sorts results in ascending distance from the
    // user's location.
    var query = {
      recordType: 'Items',
      sortBy: [{
        fieldName: 'location',
        relativeLocation: position
      }]
    };

    // Execute the query.
    return publicDB.performQuery(query)
      .then(function (response) {
        if(response.hasErrors) {

          // Handle them in your app.
          throw response.errors[0];

        } else {
          var records = response.records;
          var numberOfRecords = records.length;
          if (numberOfRecords === 0) {
            return render('No matching items')
            } else {
                        var el = render('Found ' + numberOfRecords + ' matching item'
                          + (numberOfRecords > 1 ? 's' : ''));
                        records.forEach(function (record) {
                          var fields = record.fields;
                          el.appendChild(renderItem(
                            fields['name'].value,
                            fields['location'].value,
                            fields['asset'].value.downloadURL
                          ));
                        });
                        return el;
                      }
                    }
                  })
              });
            }
