<?php


namespace app\vendor\helper;

use app\product\First_Product_Model;
use app\product\Product_Model;
use app\product_quote\Product_Price_Model;
use mysql_xdevapi\Exception;
use yangzie\YZE_DBAException;
use yangzie\YZE_DBAImpl;
use yangzie\YZE_FatalException;
use yangzie\YZE_SQL;
use yangzie\YZE_Where;

class Product_Quote_Search extends Base_Search
{


    /**
     * 分页 页码
     * @var integer
     */
    public $page;

    /**
     * 分页 页面大小
     * @var integer
     */
    public $pagesize;

    /**
     * 产品id
     * @var string
     */
    public $product_id;

    /**
     * 一级产品id
     * @var string
     */
    public $first_product_id;


    public function build_sql(YZE_SQL $sql, &$totalCount = 0)
    {
        try {
            $sql->from(Product_Price_Model::CLASS_NAME, "pq");
            $sql->left_join(Product_Model::CLASS_NAME,"p","pq.product_id = p.id");
            $sql->order_by("pq",Product_Price_Model::F_ID,"desc");
            if ($this->product_id)
                $sql->where("pq", Product_Price_Model::F_PRODUCT_ID, YZE_SQL::EQ, $this->product_id);
            if($this->first_product_id)
                $sql->where("p", Product_Model::F_FIRST_PRODUCT_ID, YZE_SQL::EQ, $this->first_product_id);
            $sql->limit(($this->page - 1) * $this->pagesize, $this->pagesize);
            $list = YZE_DBAImpl::getDBA()->select($sql);

            $sql->clean_groupby()->clean_select()->clean_limit();
            $sql->count("pq", Product_Price_Model::F_ID, "total", true);
            $obj = YZE_DBAImpl::getDBA()->getSingle($sql);
            $totalCount = $obj ? $obj["pq"]->total : 0;
        } catch (Exception $e) {
            throw new YZE_FatalException($e->getMessage());
        }
        return $list;
    }

    public function search(&$totalCount = 0)
    {
        return;
    }
}