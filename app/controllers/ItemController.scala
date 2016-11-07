package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/14.
  */
class ItemController extends Controller{
    def index = Action{
        Ok(views.html.item.item_index())

    }

    def detail = Action{
        Ok(views.html.item.item_detail())

    }
}
