package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class ManageController extends Controller {
    def index = Action {
        Ok(views.html.manage.manage_index())
    }
    def details = Action {
        Ok(views.html.manage.manage_details())
    }
    def history = Action {
        Ok(views.html.manage.manage_history())
    }
}
