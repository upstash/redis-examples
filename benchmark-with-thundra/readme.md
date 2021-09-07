## Benchmark Your Serverless Database with Thundra

Here, we benchmarked two AWS Lambda functions which fetch records from two different Serverless databases: AWS DynamoDB and Upstash Redis. 

Both databases are loaded with 7001 sample articles and both functions fetch top 10 articles with a query equivalent to:
```shell
select * from news where section = ‘World’ order by view_count desc;
```


#### First Result
[results](summary.png)
