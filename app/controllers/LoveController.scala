package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/14.
  */
class LoveController extends Controller {

    def index = Action {
        Ok(views.html.love.love_index())
    }

    def detailed = Action {
        Ok(views.html.love.love_detail())
    }

    def detailedAdd = Action {
        Ok(views.html.love.love_detail_add())
    }

    def feedback = Action {
        Ok(views.html.love.love_feedback())
    }
}