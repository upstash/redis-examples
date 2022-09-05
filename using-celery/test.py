from tasks import process_task
import time

start = time.time()

req1 = process_task.apply_async(('easy','id1', 'id1@a.a'), task_id='id1')
req2 = process_task.apply_async(('medium','id2', 'id2@a.a'), task_id='id2')
req3 = process_task.apply_async(('hard','id3', 'id3@a.a'), task_id='id3')
req4 = process_task.apply_async(('extreme','id4', 'id4@a.a'), task_id='id4')
req5 = process_task.apply_async(('undefined','id5', 'id5@a.a'), task_id='id5')

res1 = req1.wait()
res2 = req2.wait()
res3 = req3.wait()
res4 = req4.wait()
res5 = req5.wait()

print('res1:', res1)
print('res2:', res2)
print('res3:', res3)
print('res4:', res4)
print('res5:', res5) 

print('total time passed:', time.time() - start)
if res1['result'] != "Successfull" or res2['result'] != "Successfull" or res3['result'] != "Successfull" or res4['result'] != "Successfull" or res5['result'] != "Failure":
    raise Exception('execution result is wrong')

if res1['billable_time'] < 1 or res2['billable_time'] < 3 or res3['billable_time'] < 5 or res4['billable_time'] < 7 or res5['billable_time'] > 1:
    print(res1['billable_time'], res2['billable_time'], res3['billable_time'], res4['billable_time'], res5['billable_time'])
    raise Exception("Didn't sleep properly.")

