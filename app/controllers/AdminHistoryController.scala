package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/13.
  */
class AdminHistoryController extends Controller{
        def adminHistory = Action{
            Ok(views.html.Merchant.admin_History())

        }
}
