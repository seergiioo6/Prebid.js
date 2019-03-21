import {BANNER} from '../src/mediaTypes';
import {registerBidder} from '../src/adapters/bidderFactory';

const ADPONE_CODE = 'adpone';
const ADPONE_ENDPOINT = 'http://localhost:8080/rtb';
const ADPONE_REQUEST_METHOD = 'POST';
const ADPONE_CURRENCY = 'USD';

export const spec = {
  code: ADPONE_CODE,
  supportedMediaTypes: [BANNER],

  isBidRequestValid: bid => {
    return !!bid.params.placementId && !!bid.bidId;
  },

  buildRequests: bidRequests => {
    return bidRequests.map((bid, index) => {
      const url = ADPONE_ENDPOINT + '?pid=' + bid.params.placementId;
      const data = {
        at: 1,
        id: bid.bidId,
        imp: [
          {
            id: bid.bidId + '_' + index,
            banner: {
              w: bid.sizes[0][0],
              h: bid.sizes[0][1]
            },
          }
        ]
      };

      return { method: ADPONE_REQUEST_METHOD, url, data }
    });
  },

  interpretResponse: (serverResponse, bidRequest) => {
    if (!serverResponse || !serverResponse.body) {
      return [];
    }

    let answer = [];

    serverResponse.body.seatbid.forEach(seatbid => {
      if (seatbid.bid.length) {
        answer = [...answer, ...seatbid.bid.filter(bid => bid.price > 0).map(bid => ({
          id: bid.id,
          requestId: bidRequest.data.id,
          cpm: bid.price,
          ad: bid.adm,
          width: bid.w || 0,
          height: bid.h || 0,
          currency: serverResponse.body.cur || ADPONE_CURRENCY,
          netRevenue: true,
          ttl: 300,
          creativeId: bid.crid || 0
        }))];
      }
    });

    return answer;
  },

};

registerBidder(spec);
