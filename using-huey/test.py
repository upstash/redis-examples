from coin import check_and_notify, check_price, notify

webhook1 = 'webhook1'
webhook2 = 'webhook2'

threshold_eth = 3.5
threshold_btc = 40

threshold_min = 0

# Runs every minute and sends notification:
scheduled = check_and_notify('eth', threshold_eth)
scheduled.revoke()
if not scheduled.is_revoked():
    raise Exception('Schedule should be revoked')


scheduled.restore()
if scheduled.is_revoked():
    raise Exception('Schedule should be restored')


# Can manually run whenever you want:
eth_now = check_price('eth')
print('eth now', eth_now)

btc_now = check_price('btc')
print('btc now', btc_now)

if eth_now > threshold_min:
    notif_1 = notify(webhook1, f'eth above threshold: {threshold_min} with value: {eth_now}')
    notif_2 = notify(webhook2, f'eth above threshold: {threshold_min} with value: {eth_now}')

    if notif_1(blocking=True, timeout=10) != f'webhook1: eth above threshold: {threshold_min} with value: {eth_now}':
        raise Exception('Result timed out or notification message is wrong.')
    if notif_2(blocking=True, timeout=10) != f'webhook2: eth above threshold: {threshold_min} with value: {eth_now}':
        raise Exception('Result timed out or notification message is wrong.')


