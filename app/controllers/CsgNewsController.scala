package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class CsgNewsController extends Controller {

    def index = Action {
        Ok(views.html.csgNews.csgNews_index())
    }

    def add = Action {
        Ok(views.html.csgNews.csgNews_add())
    }
}