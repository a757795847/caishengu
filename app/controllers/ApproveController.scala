package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class ApproveController extends Controller {
    def index = Action {
        Ok(views.html.approve.approve())
    }
}