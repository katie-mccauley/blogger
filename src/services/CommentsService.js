import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"


class CommentsService {
  async getAll() {
    const res = await api.get('api/comments/')
    logger.log("comments", res.data)
    AppState.comments = res.data
  }
}
export const commentsService = new CommentsService()