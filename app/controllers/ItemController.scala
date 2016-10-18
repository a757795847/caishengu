package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/14.
  */
class ItemController extends Controller{
    def item = Action{
        Ok(views.html.Item_details())

    }
}
