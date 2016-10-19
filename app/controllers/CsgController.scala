package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class CsgController extends Controller {

    def index = Action {
        Ok(views.html.csg.csg_index())
    }

    def add = Action {
        Ok(views.html.csg.csg_add())
    }
}