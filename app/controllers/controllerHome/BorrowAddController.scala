package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/17.
  */
class BorrowAddController extends Controller{
    def borrowAdd = Action{
        Ok(views.html.controllerHome.borrow_add())
    }
}

