# node-namecheap

Node.js library for the [NameCheap API](http://www.namecheap.com/support/api/api.aspx).

## Installation

`npm install namecheap`

## Usage overview

### new Namecheap(api_user, api_key, client_ip [, sandbox])

	var Namecheap = require('namecheap'),
	  namecheap = new Namecheap('chadsmith', '28bc........................', '74.125.225.100');

	namecheap.domains.check('github.com', function(err, res) {
	  console.log(res);
	});

## [Domain Methods](http://www.namecheap.com/support/api/domains.aspx)

### namecheap.domains.check(domain, callback)

Checks the availability of domains

	namecheap.domains.check('github.com', function(err, res) {
		console.log(res);
	});

	namecheap.domains.check(['github.com', 'twitter.com'], function(err, res) {
		console.log(res);
	});

### namecheap.domains.create(domain [, years] [, params], callback)

Registers a new domain name. Optionally include `years` and `params` to set additional [required params](http://www.namecheap.com/support/api/domains/namecheap.domains.create.aspx). If `params` fields are not set, values from `namecheap.setDefaults` will be used.

	namecheap.domains.create('smithfam.net' function(err, res) {
		console.log(res);
	});

	namecheap.domains.create('smithfam.net', { RegistrantFirstName: 'Chad', ..... AuxBillingEmailAddress: 'chad@nospam.me' }, function(err, res) {
		console.log(res);
	});
	
### namecheap.domains.getContacts(domain, callback)

Gets contact information of the requested domain.

	namecheap.domains.getContacts('smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.getInfo(domain, callback)

Returns information about the requested domain.

	namecheap.domains.getInfo('smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.getList([params,] callback)

Returns a list of domains for the particular user. Set [optional params](http://www.namecheap.com/support/api/domains/namecheap.domains.getlist.aspx) to filter results.

	namecheap.domains.getList(function(err, res) {
	  console.log(res);
	});

	namecheap.domains.getList({ ListType: 'EXPIRED' }, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.getRegistrarLock(domain, callback)

Gets the RegistrarLock status of the requested domain.

	namecheap.domains.getRegistrarLock('nospam.me', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.getTldList(callback)

Returns a list of tlds.

	namecheap.domains.getTldList(function(err, res) {
	  console.log(res);
	});

### namecheap.domains.reactivate(domain, callback)

Reactivates an expired domain.

	namecheap.domains.reactivate('smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.renew(domain [, years, code], callback)

Renews an expiring domain. Use optional params `years` and `code` to set length of renewal or promo code. 

	namecheap.domains.renew('smithfam.net', function(err, res) {
	  console.log(res);
	});

	namecheap.domains.renew('nospam.me', 5, 'PRICEFALL', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.setContacts(domain [, params], callback)

Sets contact information for the domain.  Optionally include `params` to set additional [required params](http://www.namecheap.com/support/api/domains/namecheap.domains.setContacts.aspx). If `params` fields are not set, values from `namecheap.setDefaults` will be used.

	namecheap.domains.setContacts('smithfam.net', function(err, res) {
	  console.log(res);
	});

	namecheap.domains.setContacts('smithfam.net', { RegistrantFirstName: 'Chad', ..... AuxBillingEmailAddress: 'chad@nospam.me' }, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.setRegistrarLock(domain [, lock], callback)

Sets the RegistrarLock status for a domain. Defaults to true if `lock` is not set.

	namecheap.domains.setRegistrarLock('smithfam.net', function(err, res) {
	  console.log(res);
	});

	namecheap.domains.setRegistrarLock('smithfam.net', false, function(err, res) {
	  console.log(res);
	});

## [DNS Methods](http://www.namecheap.com/support/api/domains-dns.aspx)

### namecheap.domains.dns.getEmailForwarding(domain, callback)

Gets email forwarding settings for the requested domain.

	namecheap.domains.dns.getEmailForwarding('smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.dns.getHosts(domain, callback)

Retrieves DNS host record settings for the requested domain.

	namecheap.domains.dns.getHosts('smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.dns.getList(domain, callback)

Gets a list of DNS servers associated with the requested domain.

	namecheap.domains.dns.getList('smithfam.net', function(err, res) {
	  console.log(res);
	});
	
### namecheap.domains.dns.setCustom(domain, nameservers, callback)

Sets domain to use custom DNS servers. `nameservers` can be an array or comma separated list.

	namecheap.domains.dns.setCustom('smithfam.net', ['dns1.stabletransit.com', 'dns2.stabletransit.com'], function(err, res) {
	  console.log(res);
	});

### namecheap.domains.dns.setEmailForwarding(domain, aliases, callback)

Sets email forwarding for a domain name.

	namecheap.domains.dns.setEmailForwarding('smithfam.net', { chad: 'chad@nopsam.me', laura: 'laura@nopsam.me' }, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.dns.setEmailForwarding(domain, aliases, callback)

Sets email forwarding for a domain name.

	namecheap.domains.dns.setEmailForwarding('smithfam.net', { chad: 'chad@nopsam.me', laura: 'laura@nopsam.me' }, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.dns.setHosts(domain, hosts [, emailtype], callback)

Sets DNS [host records settings](http://www.namecheap.com/support/api/domains-dns/namecheap.domains.dns.setHosts.aspx) for the requested domain. Optional EmailType can be set.

	namecheap.domains.dns.setHosts('smithfam.net', [
	  { HostName: '@', RecordType: 'A', Address: '74.125.225.100', TTL: 3600  },
	  { HostName: 'www', RecordType: 'CNAME', Address: '@', TTL: 3600  },
	  { HostName: '@', RecordType: 'MX', Address: 'aspmx.l.google.com', MXPref: 10, TTL: 300  }
	], function(err, res) {
	  console.log(res);
	});

## [Name Server Methods](http://www.namecheap.com/support/api/domains-ns.aspx)

### namecheap.domains.ns.create(domain, nameserver, ip, callback)

Creates a new nameserver.

	namecheap.domains.ns.create('smithfam.net', 'ns1.smithfam.net', '74.125.225.100', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.ns.delete(domain, nameserver, callback)

Deletes a nameserver associated with the requested domain.

	namecheap.domains.ns.delete('smithfam.net', 'ns1.smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.ns.getInfo(domain, nameserver, callback)

Retrieves information about a registered nameserver.

	namecheap.domains.ns.getInfo('smithfam.net', 'ns1.smithfam.net', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.ns.update(domain, nameserver, oldIP, newIP, callback)

Updates the IP address of a registered nameserver.

	namecheap.domains.ns.update('smithfam.net', 'ns1.smithfam.net', '74.125.225.100', '74.125.225.50', function(err, res) {
	  console.log(res);
	});

## [Domain Transfer Methods](http://www.namecheap.com/support/api/domains-ns.aspx)

### namecheap.domains.transfer.create(domain, epp [, years, code], callback)

Transfers a domain to NameCheap.

	namecheap.domains.transfer.create('smithfam.net', 'nX^67##sDf', 'BYEBYEGD', function(err, res) {
	  console.log(res);
	});

### namecheap.domains.transfer.getList([params,] callback)

Gets the list of domain transfers. Include [optional params](http://www.namecheap.com/support/api/domains-transfer/namecheap.domains.transfer.getList.aspx) to filter the result list.

	namecheap.domains.transfer.getList(function(err, res) {
	  console.log(res);
	});

	namecheap.domains.transfer.getList({ ListType: 'COMPLETED', SortBy: 'TRANSFERDATE' }, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.transfer.getStatus(id, callback)

Gets the status of a particular transfer.

	namecheap.domains.transfer.getStatus(1337, function(err, res) {
	  console.log(res);
	});

### namecheap.domains.transfer.updateStatus(id, resubmit, callback)

Updates the status of a particular transfer. Allows you to re-submit the transfer after releasing the registry lock.

	namecheap.domains.transfer.updateStatus(1337, true, function(err, res) {
	  console.log(res);
	});

## [SSL Methods](http://www.namecheap.com/support/api/ssl.aspx)

### namecheap.ssl.activate(id, csr, servertype, email [, params], callback)

Activates a newly purchased SSL certificate. If [optional params](http://www.namecheap.com/support/api/ssl/namecheap.ssl.activate.aspx) fields are not set, values from `namecheap.setDefaults` will be used.

	namecheap.ssl.activate(500393, fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), 'Apache + OpenSSL', 'chad@nospam.me', function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.activate(500393, fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), 'Apache + OpenSSL', 'chad@nospam.me', { AdminFirstName: 'Chad', ... AdminEmailAddress: 'chad@nospam.me' }, function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.create(type [, years, code], callback)

Creates a new SSL certificate. Optionally include a the number of years or a promo code.

	namecheap.ssl.create('RapidSSL', function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.create('QuickSSL', 4, 'PROMOCODE', function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.getApproverEmailList(domain, type, callback)

Gets approver email list for the requested certificate.

	namecheap.ssl.getApproverEmailList('smithfam.net', 'RapidSSL', function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.getInfo(id, callback)

Retrieves information about the requested SSL certificate.

	namecheap.ssl.getInfo(500393, function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.getList([params,] callback)

Returns a list of SSL certificates for a particular user. Include [optional params](http://www.namecheap.com/support/api/ssl/namecheap.ssl.getList.aspx) to filter the result list.

	namecheap.ssl.getList(function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.getList({ ListType: "InProgress" }, function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.parseCSR(csr [, type], callback)

Parses the CSR. Optionally include the certificate type.

	namecheap.ssl.parseCSR(fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.parseCSR(fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), 'RapidSSL', function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.reissue(id, csr, servertype, email, params, callback)

Reissues an SSL certificate. If [optional params](http://www.namecheap.com/support/api/ssl/namecheap.ssl.reissue.aspx) fields are not set, values from `namecheap.setDefaults` will be used.

	namecheap.ssl.reissue(500393, fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), 'Apache + OpenSSL', 'chad@nospam.me', function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.reissue(500393, fs.readFileSync(path.join(__dirname, './mydomain.com.csr')), 'Apache + OpenSSL', 'chad@nospam.me', { AdminFirstName: 'Chad', ... AdminEmailAddress: 'chad@nospam.me' }, function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.renew(id, type [, years, code], callback)

Renews an SSL certificate. Optionally include the number of `years` and/or a promo `code`

	namecheap.ssl.renew(500393, 'QuickSSL', function(err, res) {
	  console.log(res);
	});

	namecheap.ssl.renew(500393, 'QuickSSL', 5, 'PROMOCODE', function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.resendApproverEmail(id, callback)

Resends the approver email.

	namecheap.ssl.resendApproverEmail(500393, function(err, res) {
	  console.log(res);
	});

### namecheap.ssl.resendFulfillmentEmail(id, callback)

Resends the fulfilment email containing the certificate.

	namecheap.ssl.resendFulfillmentEmail(500393, function(err, res) {
	  console.log(res);
	});

## [User Methods](http://www.namecheap.com/support/api/users.aspx)

### namecheap.users.changePassword(oldpass, newpass, callback)

Changes password of the particular user's account.

	namecheap.users.changePassword('12345', 'correcthorsebatterystaple', function(err, res) {
	  console.log(res);
	});

### namecheap.users.setPassword(resetcode, newpass, callback)

Sets the password of a user's account after calling [namecheap.users.resetPassword](http://www.namecheap.com/support/api/users/namecheap.users.resetPassword.aspx).

	namecheap.users.setPassword('zd8e256727d1e4c8563e014a16c1054cc', 'correcthorsebatterystaple', function(err, res) {
	  console.log(res);
	});

### namecheap.users.create(username, password, email, params, callback)

Creates a new user account at NameCheap under this ApiUser. Use `params` to set required [address params](http://www.namecheap.com/support/api/users/namecheap.users.create.aspx).

	namecheap.users.create('testuser', 'correcthorsebatterystaple', 'chad@nospam.me', { FirstName: 'Test', ... Phone: '+13165555555' }, function(err, res) {
	  console.log(res);
	});

### namecheap.users.createAddFundsRequest(amount, type, url, callback)

Creates a request to add funds through a credit card. Be sure your application follows [these steps](http://www.namecheap.com/support/api/users/namecheap.users.createaddfundsrequest.aspx).

	namecheap.users.createAddFundsRequest(100, 'creditcard', 'http://yourdomain.com/payments', function(err, res) {
	  console.log(res);
	});

### namecheap.users.getAddFundsStatus(id, callback)

Gets the status of an add funds request.

	namecheap.users.getAddFundsStatus('42a0c4f484c74d09a2edaasa5cb0fe28', function(err, res) {
	  console.log(res);
	});

### namecheap.users.getBalances(callback)

Gets information about fund in the user's account.

	namecheap.users.getBalances(function(err, res) {
	  console.log(res);
	});

### namecheap.users.getPricing(type [, code], callback)

Returns pricing information for a requested product type. Optionally include a promo `code` or [product category](http://www.namecheap.com/support/api/users/namecheap.users.getPricing.aspx) by passing an object for `type`

	namecheap.users.getPricing('DOMAIN', function(err, res) {
	  console.log(res);
	});

	namecheap.users.getPricing({ DOMAIN: 'TRANSFER' }, 'BYEBYEGD', function(err, res) {
	  console.log(res);
	});

### namecheap.users.login(username, password, callback)

Validates the username and password of accounts you created using [namecheap.users.create](http://www.namecheap.com/support/api/users/namecheap.users.create.aspx).

	namecheap.users.login('correcthorsebatterystaple', function(err, res) {
	  console.log(res);
	});

### namecheap.users.resetPassword(findby [, params], callback)

When you call this API, a link to reset password will be emailed to the end user's profile email id.The end user needs to click on the link to reset password. Send an object for the [FindBy](http://www.namecheap.com/support/api/users/namecheap.users.resetPassword.aspx) key-value pair. Optionally include [other params](http://www.namecheap.com/support/api/users/namecheap.users.resetPassword.aspx) to customize the reset email.

	namecheap.users.resetPassword({ USERNAME: 'testuser' }, function(err, res) {
	  console.log(res);
	});

	namecheap.users.resetPassword({ DOMAINNAME: 'nospam.me' }, { EmailFromName: 'mycompany.com', EmailFrom: 'admin@mycompany.com', URLPattern: 'http://mycompany.com/reset/[RESETCODE]' }, function(err, res) {
	  console.log(res);
	});

### namecheap.users.update(params, callback)

Updates user account information for the particular user. Use `params` to set required [address params](http://www.namecheap.com/support/api/users/namecheap.users.update.aspx).

	namecheap.users.update({ FirstName: 'Test', ... Phone: '+13165555555' }, function(err, res) {
	  console.log(res);
	});

## [User Address Methods](http://www.namecheap.com/support/api/users-address.aspx)

### namecheap.users.address.create(name, params [, default], callback)

Creates a new address for the user. Use `params` to set [required params](http://www.namecheap.com/support/api/users-address/namecheap.users.address.create.aspx). Optionally include `default` if it is to be the user's default address.

	namecheap.users.address.create('Personal Domains', { EmailAddress: 'chad@nospam.me', ... Phone: '+13165555555' }, function(err, res) {
	  console.log(res);
	});

	namecheap.users.address.create('Work Domains', { EmailAddress: 'chad@mktgdept.com', ... Phone: '+18775555555' }, true, function(err, res) {
	  console.log(res);
	});

### namecheap.users.address.delete(id, callback)

Deletes the particular address for the user.

	namecheap.users.address.delete(5, function(err, res) {
	  console.log(res);
	});

### namecheap.users.address.getInfo(id, callback)

Gets information for the requested address ID.

	namecheap.users.address.getInfo(5, function(err, res) {
	  console.log(res);
	});

### namecheap.users.address.getList(callback)

Gets a list of address IDs and address names associated with the user account.

	namecheap.users.address.getInfo(function(err, res) {
	  console.log(res);
	});

### namecheap.users.address.setDefault(id, callback)

Sets default address for the user.

	namecheap.users.address.setDefault(5, function(err, res) {
	  console.log(res);
	});

### namecheap.users.address.update(id, name, params [, default], callback)

Updates the particular address of the user. Use `params` to set [required params](http://www.namecheap.com/support/api/users-address/namecheap.users.address.update.aspx). Optionally include `default` if it is to be the user's default address.

	namecheap.users.address.update(2, 'Personal Domains', { EmailAddress: 'chad@nospam.me', ... Phone: '+13165555555' }, function(err, res) {
	  console.log(res);
	});

	namecheap.users.address.update(5, 'Work Domains, { EmailAddress: 'chad@mktgdept.com', ... Phone: '+18775555555' }, true, function(err, res) {
	  console.log(res);
	});

## Miscellaneous Methods

### namecheap.setDefaults(params)

Sets the default address parameters for [domain](http://www.namecheap.com/support/api/domains/namecheap.domains.create.aspx) and [SSL certificate](http://www.namecheap.com/support/api/ssl/namecheap.ssl.activate.aspx) registrations.

	namecheap.setDefaults({ RegistrantFirstName: 'Chad', ... AuxBillingPhone: '+13165555555' });

### namecheap.setUsername(username)

Changes the active API username. *Note:* Be sure to use this before signing in or using the API as another user.

	namecheap.setUsername('testuser');

## TODO

See the [issue tracker](http://github.com/chadsmith/node-namecheap/issues) for more.

## Author

[Chad Smith](http://twitter.com/chadsmith) ([chad@nospam.me](mailto:chad@nospam.me)).

## License

This project is [UNLICENSED](http://unlicense.org/) and not endorsed by or affiliated with [NameCheap](http://www.namecheap.com/).
