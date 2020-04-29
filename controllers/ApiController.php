<?php


namespace app\controllers;


use app\models\Authors;
use app\models\Books;
use yii\rest\ActiveController;

class ApiController extends ActiveController
{
    public $modelClass = 'app\models\Authors';

    /**
     * Список Книг автора
     * @param $id
     * @return array|\yii\db\ActiveRecord[]
     */
    public function actionBooksList($id){
        return Books::find()->where(['author_id'=>$id])->all();
    }


    public function actionAuthorsList(){

        return Authors::find()
            ->select(['authors.*','count(books.id) as count_books'])
            ->leftJoin('books','books.author_id = authors.id')
            ->groupBy(['authors.id'])
            ->with(['books'])
            ->asArray()
            ->all();

    }


}