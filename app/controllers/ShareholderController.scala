package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class ShareholderController extends Controller {
    def index = Action {
        Ok(views.html.shareholder.shareholder())
    }
}