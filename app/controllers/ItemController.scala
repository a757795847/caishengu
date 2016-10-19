package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class ItemController extends Controller {

    def index = Action {
        Ok(views.html.item.item_index())
    }

    def out = Action {
        Ok(views.html.item.item_out())
    }

    def waits = Action {
        Ok(views.html.item.item_wait())
    }
}