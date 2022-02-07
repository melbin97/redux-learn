import { apiCallBegan } from "../api"
import { addBug, bugAdded, bugsRequestFailed } from "../enitities/bugs"

describe("bugsSlice", () => {
  describe("action creators", () => {
    it("addBug", () => {
      const bug = { description: "a" }
      const result = addBug(bug)
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: '/bugs',
          method: 'post',
          data: bug,
          onSuccess: bugAdded.type,
          onError: bugsRequestFailed.type
        }
      }
      expect(result).toEqual(expected)
    })
  })
})