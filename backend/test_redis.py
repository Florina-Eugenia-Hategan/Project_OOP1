import redis

client = redis.StrictRedis(host='redis', port=6379, db=0)
try:
    print(client.ping())
except redis.ConnectionError as e:
    print(f"Connection failed: {e}")