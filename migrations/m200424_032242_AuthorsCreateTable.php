<?php

use yii\db\Migration;

/**
 * Class m200424_032242_AuthorsCreateTable
 */
class m200424_032242_AuthorsCreateTable extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('authors', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'date_birth' => $this->date(),
            'rating' => $this->decimal()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('authors');

        return false;
    }


}
