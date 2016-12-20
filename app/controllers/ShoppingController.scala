package controllers
import play.api.mvc._

/**
  * Created by zlm on 16/10/26.
  */
class ShoppingController  extends Controller {
    def index = Action {
        Ok(views.html.shopping.shopping_index())
    }


    def detail = Action {
        Ok(views.html.shopping.shopping_detail())
    }

    def frame = Action {
        Ok(views.html.shopping.shopping_frame())
    }

    def frameDetail = Action {
        Ok(views.html.shopping.shopping_frame_detail())
    }
    def mail = Action {
        Ok(views.html.shopping.shopping_mail())
    }
    def mailDetail = Action {
        Ok(views.html.shopping.shopping_mail_detail())
    }
    def frames = Action {
        Ok(views.html.shopping.shopping_frame_details())
    }
}
