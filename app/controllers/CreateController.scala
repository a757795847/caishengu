package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class CreateController extends Controller {

    def index = Action {
        Ok(views.html.create.create_index())
    }

    def add = Action {
        Ok(views.html.create.create_add())
    }
}
