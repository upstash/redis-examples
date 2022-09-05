use std::env;

extern crate redis;
use redis::Commands;


fn fetch_an_integer(connection_link:&str) -> redis::RedisResult<isize> {

    let client = redis::Client::open(connection_link)?;

    let mut con = client.get_connection()?;
    let _ : () = con.set("meaning-of-life", 42)? ;

    assert_eq!(con.get("meaning-of-life"), Ok(42));
    con.get("meaning-of-life")
}

fn main() {

    let host = match env::var("UPSTASH_REDIS_HOST") {
        Ok(val) => val,
        Err(_e) => "none".to_string(),
    };
    let password = match env::var("UPSTASH_REDIS_PASSWORD") {
        Ok(val) => val,
        Err(_e) => "none".to_string(),
    };
    let port = match env::var("UPSTASH_REDIS_PORT") {
        Ok(val) => val,
        Err(_e) => "none".to_string(),
    };

    let connection_link = format!("redis://:{}@{}:{}", password, host, port);

    let _ = fetch_an_integer(&connection_link);

}