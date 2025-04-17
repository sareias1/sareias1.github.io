<?php

$pref = $_COOKIE['fiberArtPreference'] ?? 'none';

if ($pref=='none'){
    echo "Browse Ravelry's <a href=\"https://www.ravelry.com/patterns/search#craft=&sort=recently-popular\"> Top Knit + Crochet Patterns</a>";
} else {
    echo "Browse Ravelry's <a href=\"https://www.ravelry.com/patterns/search#craft=$pref&sort=recently-popular\"> Top ".ucfirst($pref)." Patterns</a>";
}

?>