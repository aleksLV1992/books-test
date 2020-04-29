<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "books".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $date_birth
 * @property float|null $rating
 * @property int|null $author_id
 *
 * @property Authors $author
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['date_birth'], 'safe'],
            [['rating'], 'number'],
            [['author_id'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['author_id'], 'exist', 'skipOnError' => true, 'targetClass' => Authors::className(), 'targetAttribute' => ['author_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'date_birth' => 'Date Birth',
            'rating' => 'Rating',
            'author_id' => 'Author ID',
        ];
    }

    /**
     * Gets query for [[Author]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAuthor()
    {
        return $this->hasOne(Authors::className(), ['id' => 'author_id']);
    }

    public function getAuthorList(){
        return Authors::find()->all();
    }

    /**
     * @return array
     */
    public function getAuthorDropDownList()
    {
        $authors = $this->getAuthorList();
        $dropDownList = [];
        /* @var $item Authors */
        foreach ($authors as $item)
            $dropDownList[$item->id] = $item->name;

        return $dropDownList;
    }

    /**
     * @param $author_id
     * @return array|\yii\db\ActiveRecord[]
     */
    public function getBooksAuthor($author_id){
        return self::find()->where(['author_id' => $author_id])->orderBy(['date_birth' => SORT_DESC])->all();
    }
}
