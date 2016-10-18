package controllers.controller

import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class BorrowController extends Controller{
    def borrow = Action{
        Ok(views.html.controller.borrow())
    }
}

