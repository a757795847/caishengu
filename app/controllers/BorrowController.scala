package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class BorrowController extends Controller {

    def index = Action {
        Ok(views.html.borrow.borrow_index())
    }

    def add = Action {
        Ok(views.html.borrow.borrow_add())
    }
}

