package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class TributeController extends Controller {

    def order = Action {
        Ok(views.html.tribute.tribute_order())
    }

    def orderDetail = Action {
        Ok(views.html.tribute.tribute_order_detail())
    }

    def frame = Action {
        Ok(views.html.tribute.tribute_frame())
    }

    def frameDetail = Action {
        Ok(views.html.tribute.tribute_frame_detail())
    }
}
