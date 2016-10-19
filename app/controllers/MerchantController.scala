package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/19.
  */
class MerchantController extends Controller {
        def merchart_index = Action {
            Ok(views.html.Merchant.merchart_index())

        }
    def merchart_details = Action {
        Ok(views.html.Merchant.merchart_details())

    }
    def merchart_history = Action {
        Ok(views.html.Merchant.merchart_history())

    }
}
