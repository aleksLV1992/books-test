<?php

use yii\db\Migration;

/**
 * Class m200424_032253_BooksCreateTable
 */
class m200424_032253_BooksCreateTable extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('books', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'date_birth' => $this->date(),
            'rating' => $this->decimal(),
            'author_id' => $this->integer()
        ]);

        $this->addForeignKey(
            'author_books',
            'books',
            'author_id',
            'authors',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('books');

        return false;
    }


}
