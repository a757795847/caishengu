package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class ShoppingController extends Controller {
    def index = Action {
        Ok(views.html.shopping.shopping_index())
    }

    def out = Action {
        Ok(views.html.shopping.shopping_out())
    }

    def close = Action {
        Ok(views.html.shopping.shopping_close())
    }

    def waits = Action {
        Ok(views.html.shopping.shopping_wait())
    }

    def receive = Action {
        Ok(views.html.shopping.shopping_receive())
    }

    def frame = Action {
        Ok(views.html.shopping.shopping_frame())
    }

    def frameDetail = Action {
        Ok(views.html.shopping.shopping_frame_detail())
    }
}
