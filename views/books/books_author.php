<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\grid\GridView;
use yii\widgets\ListView;

/* @var $this yii\web\View */
/* @var $books app\models\Books */
/* @var $author app\models\Authors */
/* @var $list_books array */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Books Authors';
\yii\web\YiiAsset::register($this);
?>
<div class="books-create">

    <h1><?= Html::encode($this->title) ?></h1>
    <?= DetailView::widget([
        'model' => $author,
        'attributes' => [
            'name',
            'date_birth',
            'rating',
        ],
    ]) ?>
    <h3>Список кнги Автора:</h3>

    <?php if (count($books) != 0): ?>
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Date Birth</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($books as $key => $item): ?>
                <?php /* @var $item app\models\Books */ ?>
                <tr data-key="<?= $key; ?>">
                    <td><?= $key + 1; ?></td>
                    <td><?= $item->id; ?></td>
                    <td><?= $item->name; ?></td>
                    <td><?= $item->date_birth; ?></td>
                    <td><?= $item->rating; ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>

    <?php else: ?>
        <div class="alert alert-danger">
            Список пуст
        </div>
    <?php endif; ?>

</div>
