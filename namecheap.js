var parser = require('xml2json'),
  request = require('request'),
  qs = require('querystring'),
  util = require('util');

var namecheap = function(api_user, api_key, client_ip, sandbox) {
  this.api_user = this.username = api_user;
  this.api_key = api_key;
  this.client_ip = client_ip;
  this.endpoint = 'https://api.' + (sandbox ? 'sandbox.' : '') + 'namecheap.com/xml.response';
  this.defaults = {};
};
namecheap.prototype = {
  get domains() {
    var instance = this;
    return {
      check: function(DomainList, callback) {
        DomainList = util.isArray(DomainList) ? DomainList : [DomainList];
        return instance.command('domains.check', { DomainList: DomainList }, callback);
      },
      create: function(domain, years, params, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        var options = instance.defaults, k, y = parseInt(years);
        if('[object Function]' == Object.prototype.toString.call(years)) {
          callback = years;
          y = 1;
          params = {};
        }
        else if('[object Object]' == Object.prototype.toString.call(years)) {
          params = years;
          y = 1;
        }
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        for(k in params)
          if(params.hasOwnProperty(k))
            options[k] = params[k];
        options.DomainName = domain;
        options.Years = years;
        return instance.command('domains.create', options, callback);
      },
      getContacts: function(domain, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        return instance.command('domains.getContacts', { DomainName: domain }, callback);
      },
      getInfo: function(domain, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        return instance.command('domains.getInfo', { DomainName: domain }, callback);
      },
      getList: function(params, callback) {
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        return instance.command('domains.getList', params, callback);
      },
      getRegistrarLock: function(domain, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        return instance.command('domains.getRegistrarLock', { DomainName: domain }, callback);
      },
      getTldList: function(callback) {
        return instance.command('domains.getTldList', {}, callback);
      },
      reactivate: function(domain, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        return instance.command('domains.reactivate', { DomainName: domain }, callback);
      },
      renew: function(domain, years, code, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        var y = parseInt(years), params = { DomainName: domain };
        if('[object Function]' == Object.prototype.toString.call(years)) {
          callback = years;
          y = 1;
          code = null;
        }
        else if('[object Function]' == Object.prototype.toString.call(code)) {
          callback = code;
          code = null;
        }
        else if(!y) {
          code = years;
          y = 1;
        }
        params.Years = y;
        if(code)
          params.PromotionCode = code;
        return instance.command('domains.renew', params, callback);
      },
      setContacts: function(domain, params, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        var options = instance.defaults, k;
        for(k in params)
          if(params.hasOwnProperty(k))
            options[k] = params[k];
        options.DomainName = domain;
        return instance.command('domains.setContacts', options, callback);
      },
      setRegistrarLock: function(domain, lock, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        if('[object Function]' == Object.prototype.toString.call(lock)) {
          callback = lock;
          lock = true;
        }
        return instance.command('domains.setRegistrarLock', { DomainName: domain, LockAction: lock ? 'LOCK' : 'UNLOCK' }, callback);
      },
      dns: {
        getEmailForwarding: function(domain, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          return instance.command('domains.dns.getEmailForwarding', { DomainName: domain }, callback);
        },
        getHosts: function(domain, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          domain = domain.split('.');
          return instance.command('domains.dns.getHosts', { SLD: domain.shift(), TLD: domain.join('.') }, callback);
        },
        getList: function(domain, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          domain = domain.split('.');
          return instance.command('domains.dns.getList', { SLD: domain.shift(), TLD: domain.join('.') }, callback);
        },
        setCustom: function(domain, nameservers, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!nameservers)
            throw new Error('You must include a list of nameservers.');
          domain = domain.split('.');
          nameservers = util.isArray(nameservers) ? nameservers.join() : nameservers;
          return instance.command('domains.dns.setCustom', { SLD: domain.shift(), TLD: domain.join('.'), Nameservers: nameservers }, callback);
        },
        setDefault: function(domain, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          domain = domain.split('.');
          return instance.command('domains.dns.setDefault', { SLD: domain.shift(), TLD: domain.join('.') }, callback);
        },
        setEmailForwarding: function(domain, aliases, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!aliases)
            throw new Error('You must include aliases.');
          var params = { DomainName: domain }, k, i = 1;
          for(k in aliases)
            if(aliases.hasOwnProperty(k)) {
              params['MailBox' + i] = k;
              params['ForwardTo' + i] = aliases[k];
              i++;
            }
          return instance.command('domains.dns.setEmailForwarding', params, callback);
        },
        setHosts: function(domain, hosts, type, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!hosts)
            throw new Error('You must include hosts.');
          if('[object Function]' == Object.prototype.toString.call(type)) {
            callback = type;
            type = null;
          }
          domain = domain.split('.');
          var params = { SLD: domain.shift(), TLD: domain.join('.') }, i = 0, k, l = hosts.length;
          for(; i < l; i++)
            for(k in hosts[i])
              if(hosts[i].hasOwnProperty(k))
                params[k + (1 + i)] = hosts[i][k];
          if(type)
            params.EmailType = type;
          return instance.command('domains.dns.setHosts', params, callback);
        },
      },
      ns: {
        create: function(domain, nameserver, ip, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!nameserver)
            throw new Error('You must include a nameserver.');
          if(!ip)
            throw new Error('You must include an IP.');
          domain = domain.split('.');
          return instance.command('domains.ns.create', { SLD: domain.shift(), TLD: domain.join('.'), Nameserver: nameserver, IP: ip }, callback);
        },
        delete: function(domain, nameserver, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!nameserver)
            throw new Error('You must include a nameserver.');
          domain = domain.split('.');
          return instance.command('domains.ns.delete', { SLD: domain.shift(), TLD: domain.join('.'), Nameserver: nameserver }, callback);
        },
        getInfo: function(domain, nameserver, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!nameserver)
            throw new Error('You must include a nameserver.');
          domain = domain.split('.');
          return instance.command('domains.ns.getInfo', { SLD: domain.shift(), TLD: domain.join('.'), Nameserver: nameserver }, callback);
        },
        update: function(domain, nameserver, old, ip, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!nameserver)
            throw new Error('You must include a nameserver.');
          if(!old)
            throw new Error('You must include the old IP.');
          if(!ip)
            throw new Error('You must include the new IP.');
          domain = domain.split('.');
          return instance.command('domains.ns.update', { SLD: domain.shift(), TLD: domain.join('.'), Nameserver: nameserver, OldIP: old, IP: ip }, callback);
        }
      },
      transfer: {
        create: function(domain, epp, years, code, callback) {
          if(!domain)
            throw new Error('You must include a domain name.');
          if(!epp)
            throw new Error('You must include an EPP code.');
          var y = parseInt(years),
            params = {
            DomainName: domain,
            EPPCode: epp
          };
          if('[object Function]' == Object.prototype.toString.call(years)) {
            callback = years;
            y = 1;
            code = null;
          }
          else if('[object Function]' == Object.prototype.toString.call(code)) {
            callback = code;
            code = null;
          }
          else if(!y) {
            code = years;
            y = 1;
          }
          params.Years = y;
          if(code)
            params.PromotionCode = code;
          return instance.command('domains.transfer.create', params, callback);
        },
        getList: function(params, callback) {
          if('[object Function]' == Object.prototype.toString.call(params)) {
            callback = params;
            params = {};
          }
          return instance.command('domains.transfer.getList', params, callback);
        },
        getStatus: function(id, callback) {
          if(!id)
            throw new Error('You must include a transfer ID.');
          return instance.command('domains.transfer.getStatus', { TransferID: id }, callback);
        },
        updateStatus: function(id, resubmit, callback) {
          if(!id)
            throw new Error('You must include a transfer ID.');
          return instance.command('domains.transfer.updateStatus', { TransferID: id, Resubmit: resubmit }, callback);
        }
      }
    };
  },
  get ssl() {
    var instance = this;
    return {
      activate: function(id, csr, type, email, params, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        if(!csr)
          throw new Error('You must include a CSR.');
        if(!type)
          throw new Error('You must include a web server type.');
        if(!email)
          throw new Error('You must include an approver email.');
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        var options = instance.defaults, k;
        for(k in params)
          if(params.hasOwnProperty(k))
            options[k] = params[k];
        options.CertificateID = id;
        options.ApproverEmail = email;
        options.csr = csr;
        options.WebServerType = type;
        return instance.command('ssl.activate', options, callback, 'POST');
      },
      create: function(type, years, code, callback) {
        if(!type)
          throw new Error('You must include a certificate type.');
        var y = parseInt(years), params = { Type: type };
        if('[object Function]' == Object.prototype.toString.call(years)) {
          callback = years;
          y = 1;
          code = null;
        }
        else if('[object Function]' == Object.prototype.toString.call(code)) {
          callback = code;
          code = null;
        }
        else if(!y) {
          code = years;
          y = 1;
        }
        params.Years = y;
        if(code)
          params.PromotionCode = code;
        return instance.command('ssl.create', params, callback);
      },
      getApproverEmailList: function(domain, type, callback) {
        if(!domain)
          throw new Error('You must include a domain name.');
        if(!type)
          throw new Error('You must include a certificate type.');
        return instance.command('ssl.getApproverEmailList', { DomainName: domain, CertificateType: type }, callback);
      },
      getInfo: function(id, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        return instance.command('ssl.getInfo', { CertificateID: id }, callback);
      },
      getList: function(params, callback) {
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        return instance.command('ssl.getList', params, callback);
      },
      parseCSR: function(csr, type, callback) {
        if(!csr)
          throw new Error('You must include a CSR.');
        var params = { csr: csr };
        if('[object Function]' == Object.prototype.toString.call(type))
          callback = type;
        else
          params.CertificateType = type;
        return instance.command('ssl.parseCSR', params, callback, 'POST');
      },
      reissue: function(id, csr, type, email, params, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        if(!csr)
          throw new Error('You must include a CSR.');
        if(!type)
          throw new Error('You must include a web server type.');
        if(!email)
          throw new Error('You must include an approver email.');
        if('[object Function]' == Object.prototype.toString.call(params)) {
          callback = params;
          params = {};
        }
        var options = instance.defaults, k;
        for(k in params)
          if(params.hasOwnProperty(k))
            options[k] = params[k];
        options.CertificateID = id;
        options.ApproverEmail = email;
        options.csr = csr;
        options.WebServerType = type;
        return instance.command('ssl.reissue', options, callback, 'POST');
      },
      renew: function(id, type, years, code, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        if(!type)
          throw new Error('You must include a certificate type.');
        var y = parseInt(years), params = { CertificateID: id, SSLType: type };
        if('[object Function]' == Object.prototype.toString.call(years)) {
          callback = years;
          y = 1;
          code = null;
        }
        else if('[object Function]' == Object.prototype.toString.call(code)) {
          callback = code;
          code = null;
        }
        else if(!y) {
          code = years;
          y = 1;
        }
        params.Years = y;
        if(code)
          params.PromotionCode = code;
        return instance.command('ssl.renew', params, callback);
      },
      resendApproverEmail: function(id, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        return instance.command('ssl.resendApproverEmail', { CertificateID: id }, callback);
      },
      resendFulfillmentEmail: function(id, callback) {
        if(!id)
          throw new Error('You must include a certificate ID.');
        return instance.command('ssl.resendFulfillmentEmail', { CertificateID: id }, callback);
      },
    };
  },
  get users() {
    var instance = this;
    return {
      changePassword: function(oldpass, newpass, callback) {
        if(!oldpass)
          throw new Error('You must include the old password.');
        if(!newpass)
          throw new Error('You must include a new password.');
        return instance.command('users.changePassword', { OldPassword: oldpass, NewPassword: newpass }, callback);
      },
      setPassword: function(code, newpass, callback) {
        if(!code)
          throw new Error('You must include the reset code.');
        if(!newpass)
          throw new Error('You must include a new password.');
        return instance.command('users.changePassword', { ResetCode: code, NewPassword: newpass }, callback);
      },
      create: function(username, password, email, params, callback) {
        if(!username)
          throw new Error('You must include a username.');
        if(!password)
          throw new Error('You must include a password.');
        if(!email)
          throw new Error('You must include an email address.');
        if(!params)
          throw new Error('You must include name and address parameters.');
        var options = {}, k;
        for(k in params)
          if(params.hasOwnProperty(k))
            options[k] = params[k];
        options.NewUserName = username;
        options.NewUserPassword = password;
        options.EmailAddress = email;
        options.AcceptTerms = 1;
        return instance.command('users.create', options, callback);
      },
      createAddFundsRequest: function(amount, type, url, callback) {
        if(!amount)
          throw new Error('You must include an amount.');
        if(!type)
          throw new Error('You must include a payment type.');
        if(!url)
          throw new Error('You must include a return URL.');
        return instance.command('users.createAddFundsRequest', { Amount: amount, PaymentType: type, ReturnUrl: url }, callback);
      },
      getAddFundsStatus: function(id, callback) {
        if(!id)
          throw new Error('You must include a token ID.');
        return instance.command('users.getAddFundsStatus', { TokenId: id }, callback);
      },
      getBalances: function(callback) {
        return instance.command('users.getBalances', {}, callback);
      },
      getPricing: function(type, code, callback) {
        if(!type)
          throw new Error('You must include a product type.');
        var params = {};
        if('[object Object]' == Object.prototype.toString.call(type)) {
          params.ProductType = Object.keys(type)[0];
          params.ProductCategory = type[params.ProductType];
        }
        else
          params.ProductType = type;
        if('[object Function]' == Object.prototype.toString.call(code))
          callback = code;
        else
          params.PromotionCode = code;
        return instance.command('users.getPricing', params, callback);
      },
      login: function(password, callback) {
        if(!password)
          throw new Error('You must include a password.');
        return instance.command('users.login', { Password: password }, callback);
      },
      resetPassword: function(findby, params, callback) {
        if(!findby)
          throw new Error('You must include a find by key and value.');
        var options = {}, k;
        options.FindBy = Object.keys(findby)[0];
        options.FindByValue = findby[params.FindBy];
        if('[object Function]' == Object.prototype.toString.call(params))
          callback = params;
        else
          for(k in params)
            if(params.hasOwnProperty(k))
              options[k] = params[k];
        return instance.command('users.resetPassword', options, callback);
      },
      update: function(params, callback) {
        if(!params)
          throw new Error('You must include address parameters.');
        return instance.command('users.update', params, callback);
      },
      address: {
        create: function(name, params, def, callback) {
          if(!name)
            throw new Error('You must include an address name.');
          if(!params)
            throw new Error('You must include address parameters.');
          if('[object Function]' == Object.prototype.toString.call(def)) {
            callback = def;
            def = false;
          }
          var options = {}, k;
          for(k in params)
            if(params.hasOwnProperty(k))
              options[k] = params[k];
          options.AddressName = name;
          options.DefaultYN = def ? 1 : 0;
          return instance.command('users.address.create', options, callback);
        },
        delete: function(id, callback) {
          if(!id)
            throw new Error('You must include an address ID.');
          return instance.command('users.address.delete', { AddressId: id }, callback);
        },
        getInfo: function(id, callback) {
          if(!id)
            throw new Error('You must include an address ID.');
          return instance.command('users.address.getInfo', { AddressId: id }, callback);
        },
        getList: function(callback) {
          return instance.command('users.address.getList', {}, callback);
        },
        setDefault: function(id, callback) {
          if(!id)
            throw new Error('You must include an address ID.');
          return instance.command('users.address.setDefault', { AddressId: id }, callback);
        },
        update: function(id, name, params, def, callback) {
          if(!id)
            throw new Error('You must include an address ID.');
          if(!name)
            throw new Error('You must include an address name.');
          if(!params)
            throw new Error('You must include address parameters.');
          if('[object Function]' == Object.prototype.toString.call(def)) {
            callback = def;
            def = false;
          }
          var options = {}, k;
          for(k in params)
            if(params.hasOwnProperty(k))
              options[k] = params[k];
          options.AddressId = id;
          options.AddressName = name;
          options.DefaultYN = def ? 1 : 0;
          return instance.command('users.address.update', options, callback);
        }
      }
    };
  },
  setDefaults: function(params) {
    if(!params)
      throw new Error('You must include parameters.');
    this.defaults = params;
    return this;
  },
  setUsername: function(username) {
    if(!username)
      throw new Error('You must include a username.');
    this.username = username;
    return this;
  },
  command: function(cmd, params, callback, method) {
    params.ApiUser = this.api_user;
    params.ApiKey = this.api_key;
    params.UserName = this.username;
    params.Command = 'namecheap.' + cmd;
    params.ClientIp = this.client_ip;
    var options = {
      method: method || 'GET',
      uri: this.endpoint
    };
    params = qs.stringify(params);
    if('POST' == method)
      options.body = params;
    else
      options.uri += '?' + params;
    request(options, function(err, res, body) {
      body = parser.toJson(body, { object: true });
      err = body.ApiResponse.Errors.Error;
      res = body.ApiResponse.CommandResponse;
      err = err ? { code : err.Number, message: err.$t } : undefined;
      res = res ? res[Object.keys(res)[0]] : undefined;
      callback && callback(err, res);
    });
    return this;
  }
};

module.exports = namecheap;
