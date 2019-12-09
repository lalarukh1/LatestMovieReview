<?php /** @noinspection PhpUndefinedVariableInspection */

/** @noinspection PhpUndefinedMethodInspection */

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use App\Movies;
use GuzzleHttp\Client;

class MainController extends Controller
{
    public function index()
    {
        return view('search');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Httpful\Exception\ConnectionErrorException
     * @throws \AlgoliaSearch\AlgoliaException
     * @throws \Exception
     */
    public function show()
    {
        //return view('search');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \AlgoliaSearch\AlgoliaException
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Exception
     */
    public function store()
    {

        //Delete all records from DB table
        Movies::truncate();

        //Initiate Algolia client and index
        $client = new \AlgoliaSearch\Client('7VM1U74DCL', 'e4734fd0e355f789ce2067b33bbdb5d0');
        $index = $client->initIndex('reviews');
        $tmpIndex = $client->initIndex('reviews_tmp');

        //First Api call with offset 20
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $query = array(
            "api-key" => "B4M0PyBla9l9HJKQ9aVro4Fux05rahlH",
            "offset" => 20
        );
        curl_setopt($curl, CURLOPT_URL,
            "https://api.nytimes.com/svc/movies/v2/reviews/search.json" . "?" . http_build_query($query)
        );

        $response = json_decode(curl_exec($curl));

        for ($x = 0; $x <= 19; $x++) {
            $review = new Movies;
            $review->setAttribute('display_title', $response->results[$x]->display_title)->searchable();
            $review->setAttribute('byline', $response->results[$x]->byline)->searchable();
            $review->setAttribute('headline', $response->results[$x]->headline)->searchable();
            $review->setAttribute('summary_short', $response->results[$x]->summary_short)->searchable();
            $review->setAttribute('opening_date', $response->results[$x]->opening_date)->searchable();
            $review->setAttribute('url', $response->results[$x]->link->url)->searchable();
            $review->setAttribute('suggested_link_text', $response->results[$x]->link->suggested_link_text)->searchable();
            $review->setAttribute('src', $response->results[$x]->multimedia->src)->searchable();
            $review->save();
        }

        //Second Api call with offset 40
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $query = array(
            "api-key" => "B4M0PyBla9l9HJKQ9aVro4Fux05rahlH",
            "offset" => 40
        );
        curl_setopt($curl, CURLOPT_URL,
            "https://api.nytimes.com/svc/movies/v2/reviews/search.json" . "?" . http_build_query($query)
        );
        $response1 = json_decode(curl_exec($curl));

        for ($x = 0; $x <= 19; $x++) {
            $review = new Movies;
            $review->setAttribute('display_title', $response1->results[$x]->display_title)->searchable();
            $review->setAttribute('byline', $response1->results[$x]->byline)->searchable();
            $review->setAttribute('headline', $response1->results[$x]->headline)->searchable();
            $review->setAttribute('summary_short', $response1->results[$x]->summary_short)->searchable();
            $review->setAttribute('opening_date', $response1->results[$x]->opening_date)->searchable();
            $review->setAttribute('url', $response1->results[$x]->link->url)->searchable();
            $review->setAttribute('suggested_link_text', $response1->results[$x]->link->suggested_link_text)->searchable();
            $review->setAttribute('src', $response1->results[$x]->multimedia->src)->searchable();
            $review->save();
        }

        //Third Api call with offset 60
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $query = array(
            "api-key" => "B4M0PyBla9l9HJKQ9aVro4Fux05rahlH",
            "offset" => 60
        );
        curl_setopt($curl, CURLOPT_URL,
            "https://api.nytimes.com/svc/movies/v2/reviews/search.json" . "?" . http_build_query($query)
        );
        $response2 = json_decode(curl_exec($curl));

        for ($x = 0; $x <= 19; $x++) {
            $review = new Movies;
            $review->setAttribute('display_title', $response2->results[$x]->display_title)->searchable();
            $review->setAttribute('byline', $response2->results[$x]->byline)->searchable();
            $review->setAttribute('headline', $response2->results[$x]->headline)->searchable();
            $review->setAttribute('summary_short', $response2->results[$x]->summary_short)->searchable();
            $review->setAttribute('opening_date', $response2->results[$x]->opening_date)->searchable();
            $review->setAttribute('url', $response2->results[$x]->link->url)->searchable();
            $review->setAttribute('suggested_link_text', $response2->results[$x]->link->suggested_link_text)->searchable();
            $review->setAttribute('src', $response2->results[$x]->multimedia->src)->searchable();
            $review->save();
        }

        //Get data from database table and send it to Algolia
        $client->scopedCopyIndex(
            $index->indexName,
            $tmpIndex->indexName,
            ['settings', 'synonyms', 'rules']
        );
        $objects = json_decode(DB::table('movies')->get());
        $chunks = array_chunk($objects, 1000);
        foreach ($chunks as $batch) {
            $tmpIndex->addObjects($batch);
        }
        $client->moveIndex($tmpIndex->indexName, $index->indexName);
        //$index->addObjects($data);
        return view('search', compact('data'));
    }
}
