package main

import (
    "context"
    "github.com/go-redis/redis/v9"
    "fmt"
    "os"
)

var ctx = context.Background()

func main() {
    host := os.Getenv("UPSTASH_REDIS_HOST")
    password := os.Getenv("UPSTASH_REDIS_PASSWORD")
    port := os.Getenv("UPSTASH_REDIS_PORT")

    rdb := redis.NewClient(&redis.Options{
        Addr:     (host + ":" + port),
        Password: password,
    })

    err := rdb.Set(ctx, "key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)

    val2, err := rdb.Get(ctx, "key2").Result()
    if err == redis.Nil {
        fmt.Println("key2 does not exist")
    } else if err != nil {
        panic(err)
    } else {
        fmt.Println("key2", val2)
    }

}