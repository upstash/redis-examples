import time
from tasks import reverse, duplicate
from app import huey

rev_str = 'str_to_reverse'
dup_str = 'str_to_duplicate'
email = 'test@email.com'

start = time.time()

rev_res = reverse(email=email, string_to_process=rev_str)(blocking=True)
rev_time = time.time()

if rev_time - start < 1 or rev_res != rev_str[::-1] :
    raise Exception(f"Reverse function didn't work properly. {rev_res}: {rev_time - start}")

dup_res = duplicate(email=email, string_to_process=dup_str)(blocking=True)
dup_time = time.time()

if dup_time - start < 4 or dup_res != (dup_str + dup_str):
    raise Exception(f"Duplication function didn't work properly. {dup_res}: {dup_time - start}")


start = time.time()
rev_str2 = 'str_to_reverse2'

res = reverse.schedule((email, rev_str2), delay=5)(blocking=True)

end = time.time()

if end-start < 6 or res != rev_str2[::-1]:
    raise Exception(f"Huey delay didn't work properly. {res}: {start-end}")

