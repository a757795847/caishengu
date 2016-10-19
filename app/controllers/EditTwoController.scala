package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/19.
  */
class EditTwoController extends Controller{
        def edittwo = Action{
            Ok(views.html.EditTwo())

        }
}
