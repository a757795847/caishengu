package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/13.
  */
class AdminEditController extends Controller{
        def adminEdit = Action{
            Ok(views.html.Merchant.admin_Edit())

        }

}
