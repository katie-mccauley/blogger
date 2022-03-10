import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {


  async getAll(query = {}) {
    const res = await api.get('api/blogs/', { params: query })
    logger.log(res.data)
    AppState.posts = res.data
  }

  setActive(post) {
    AppState.activePosts = post
  }
}

export const postsService = new PostsService()