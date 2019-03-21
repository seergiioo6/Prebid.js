# Overview

Module Name: Adpone Bidder Adapter

Module Type: Bidder Adapter

Maintainers: sergio@adpone.com, ricard@adpone.com

# Description

You can use this adapter to get a bid from adpone.com.

About us : https://www.adpone.com


# Test Parameters
```javascript
    var adUnits = [
        {
            code: 'div-adpone-example',
            sizes: [[300, 250]],
            bids: [
                {
                    bidder: "adpone",
                    params: {
                      placementId: "1234"
                    }
                }
            ]
        }
    ];
```
