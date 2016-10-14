package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/13.
  */
class AdministratorController extends Controller {
    def administrator = Action{
            Ok(views.html.Merchant.administrator())

    }

}
